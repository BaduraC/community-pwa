let isQRScanned = false; // Status, ob der QR-Code gescannt wurde

function startQRProcess() {
    if (isQRScanned) {
        // Wenn der QR-Code bereits gescannt wurde, leite direkt weiter
        window.location.href = 'thema1.html';
    } else {
        // Öffne den QR-Scanner
        showScanner();
    }
}

function showScanner() {
    document.getElementById('scanner-container').style.display = 'block';
    startScanner();
}

function hideScanner() {
    document.getElementById('scanner-container').style.display = 'none';
    stopScanner();
}

function startScanner() {
    const videoElement = document.getElementById('qr-reader');

    // Kamera-Stream starten
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(stream => {
            videoElement.srcObject = stream;
            videoElement.play();

            videoElement.addEventListener('loadedmetadata', () => {
                console.log(`Video dimensions: ${videoElement.videoWidth}x${videoElement.videoHeight}`);
              
            const html5QrCode = new Html5Qrcode(videoElement.id);

            html5QrCode.start(
                { facingMode: "environment" }, // Rückkamera verwenden
                {
                    fps: 10, // Frames pro Sekunde
                    qrbox: { width: 250, height: 250 } // Scanner-Box-Größe
                },
                qrCodeMessage => {
                    onQRDetected(qrCodeMessage); // QR-Code erfolgreich gescannt
                },
                errorMessage => {
                    console.warn("QR-Code-Fehler: ", errorMessage); // Fehler beim Scannen
                }
            ).catch(err => {
                console.error("Fehler beim Starten des QR-Scanners: ", err);
                alert("Kamera konnte nicht gestartet werden. Bitte Berechtigungen überprüfen.");
            });
        });	
})
.catch(err => {
        console.error("Fehler beim Zugriff auf die Kamera: ", err);
        alert("Kamera konnte nicht gestartet werden. Bitte Berechtigungen überprüfen.");
    });
}

function stopScanner() {
    const videoElement = document.getElementById('qr-video');
    if (videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach(track => track.stop());
    }
}

function onQRDetected(qrCodeContent) {
    stopScanner();
    hideScanner();

    if (qrCodeContent === 'https://badurac.github.io/community-pwa/thema1.html') {
        // QR-Code ist korrekt
        isQRScanned = true;

        // Button farbig machen
        const qrButton = document.getElementById('qr-button');
        qrButton.classList.remove('bg-gray-400');
        qrButton.classList.add('bg-indigo-600', 'hover:bg-indigo-700');

        // Speichere den Status im localStorage
        localStorage.setItem('qr-geheimnis1-scanned', 'true');

        // Weiterleitung zu geheimnis1.html
        window.location.href = 'thema1.html';
    } else {
        alert('Ungültiger QR-Code. Bitte versuche es erneut.');
    }
}

// Beim Laden der Seite prüfen, ob der QR-Code bereits gescannt wurde
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('qr-geheimnis1-scanned')) {
        isQRScanned = true;

        // Button farbig machen
        const qrButton = document.getElementById('qr-button');
        qrButton.classList.remove('bg-gray-400');
        qrButton.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
    }
});