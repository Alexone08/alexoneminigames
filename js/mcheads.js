const canvas = document.getElementById('profileCanvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');
const loadAvatarBtn = document.getElementById('loadAvatarBtn');
const usernameInput = document.getElementById('username');
const color1Picker = document.getElementById('color1');
const color2Picker = document.getElementById('color2');
const imageTypeSelect = document.getElementById('imageType');
const transparentBgCheckbox = document.getElementById('transparentBg');

let avatarImage = null; 

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Disegna il gradiente di sfondo se non è selezionata l'opzione di sfondo trasparente
    if (!transparentBgCheckbox.checked) {
        const bgColor1 = color1Picker.value;
        const bgColor2 = color2Picker.value;

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, bgColor1);
        gradient.addColorStop(1, bgColor2);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Disegna l'immagine avatar mantenendo le proporzioni
    if (avatarImage) {
        const aspectRatio = avatarImage.width / avatarImage.height;
        const newWidth = 128; // Larghezza desiderata
        const newHeight = newWidth / aspectRatio; // Calcola l'altezza mantenendo le proporzioni

        // Centra l'immagine sul canvas
        const x = (canvas.width - newWidth) / 2;

        // Imposta la coordinata y in base al tipo di immagine
        let y;
        if (imageTypeSelect.value === "body") {
            y = (canvas.height - newHeight) / 2 + 60; // Sposta verso il basso per "body"
        } else {
            y = (canvas.height - newHeight) / 2; // Mantieni al centro per altre opzioni
        }

        ctx.drawImage(avatarImage, x, y, newWidth, newHeight);
    }
}

// Evento per il download dell'immagine finale
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'minecraft_profile.png';
    link.href = canvas.toDataURL(); 
    link.click();
});

// Evento per caricare l'avatar
loadAvatarBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();

    if (username) {
        const imageType = imageTypeSelect.value;
        const avatarUrl = `https://mc-heads.net/${imageType}/${username}/128`;

        avatarImage = new Image();
        avatarImage.crossOrigin = "anonymous"; // Permette il caricamento di immagini da domini esterni
        avatarImage.src = avatarUrl;

        avatarImage.onload = function() {
            draw(); // Disegna l'immagine dopo il caricamento
        };

        avatarImage.onerror = function() {
            alert("Errore: Nome utente non trovato!");
        };
    } else {
        alert("Per favore inserisci un nome utente!");
    }
});

// Aggiungi eventi per i cambiamenti nei selettori di colore e checkbox
color1Picker.addEventListener('input', draw);
color2Picker.addEventListener('input', draw);
transparentBgCheckbox.addEventListener('change', draw); 

draw(); // Disegna il canvas inizialmente
