import { PublicationView } from './componentes/publication/PublicationView';
import { DashboardPage } from "./pages/dashboard"
import { obtenerPublicaciones } from './servicios';

export const routes = [
    { path: '/', element: <DashboardPage /> },
    { path: '/publication/:id', element: <PublicationView obtenerPublicaciones={obtenerPublicaciones} /> },
]