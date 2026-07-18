type Theme = 'light' | 'dark'
const STORAGE_KEY = 'theme'

function applyTheme(theme: Theme) {
    document.documentElement.className = theme
    localStorage.setItem(STORAGE_KEY, theme)
}

const saved = localStorage.getItem(STORAGE_KEY) as Theme | null /*
    - On load: restore saved theme if any
*/
if(saved) {
    applyTheme(saved)
}

document.querySelector('.theme-toggle')?.addEventListener('click', async (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.theme-toggle_btn')
    if(!btn?.dataset.theme) {
        return
    }
    applyTheme(btn.dataset.theme as Theme)
})