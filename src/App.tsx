import MainLayout from './components/MainLayout/MainLayout';
import { AudioProvider } from './context/AudioContext';
import { CallsPage } from './pages/CallsPage';

function App() {
    return (
        <AudioProvider>
            <MainLayout>
                <CallsPage />
            </MainLayout>
        </AudioProvider>
    );
}

export default App;
