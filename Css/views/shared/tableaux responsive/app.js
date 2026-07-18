document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.table-responsive').forEach(function (table) {
        let labels = Array.from(table.querySelectorAll('th')).map(function (th) {
            return th.innerText
        }) // Ou .. forEach - labels.push
        table.querySelectorAll('td').forEach(function (td, i) {
            td.setAttribute('data-label', labels[i % labels.length]) // '%' pour avoir une valeur entre 0 et 4 th
        })
    })
})