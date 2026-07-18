import {
    Chart as Char,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line, Bar, Bubble, Pie, Doughnut, Radar } from 'react-chartjs-2'

// -- Enregistre les composants nécessaires pour Chart.js
Char.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export function Chart({
    type,
    labels,
    data
}) {

}