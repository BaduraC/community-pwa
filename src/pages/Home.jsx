import React from 'react';

const Home = () => {
    return (
        <div className="home">
            <h1>Willkommen zur Schnitzeljagd!</h1>
            <p>Mach dich bereit für ein spannendes Abenteuer in unserer Gemeinde.</p>
            <p>Hier findest du alle Informationen, die du für die Schnitzeljagd benötigst.</p>
            <button onClick={() => alert('Schnitzeljagd starten!')}>Schnitzeljagd starten</button>
        </div>
    );
};

export default Home;