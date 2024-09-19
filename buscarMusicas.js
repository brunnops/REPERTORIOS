
// Função para remover acentos das strings
function removeAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function search() {
    const query = removeAcentos($("#searchInput").val().toLowerCase().trim());
    const sheetID = '1rEmtLEKMz7wGXYs2y3FKpp_BCcNVI4y_UmtL7AC-noY';
    const apiKey = 'AIzaSyAc1AvFjueKSY6yTiOv6g6-dJY7a05urLk';
    const sheetName = 'REPERTORIOS';
    let allResults = [];

    if (query === "") {
        $("#results").html('<p style="color: red;">Por favor, insira uma palavra-chave válida para a busca.</p>');
        return;
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?key=${apiKey}`;
    
    $.getJSON(url).then(function(data) {
        const rows = data.values;

        if (!rows || rows.length === 0) {
            console.log("Nenhum dado encontrado");
            return;
        }

        const results = rows.filter(row => 
            removeAcentos((row[0] || "").toLowerCase()).includes(query) || 
            removeAcentos((row[1] || "").toLowerCase()).includes(query) || 
            removeAcentos((row[2] || "").toLowerCase()).includes(query) ||
            removeAcentos((row[3] || "").toLowerCase()).includes(query) || 
            removeAcentos((row[4] || "").toLowerCase()).includes(query) || 
            removeAcentos((row[5] || "").toLowerCase()).includes(query)
        );

        allResults = allResults.concat(results);

        if (allResults.length === 0) {
            $("#results").html('<p style="color: red;">Nenhum resultado encontrado. Tente outra busca.</p>');
        } else {
            let html = '<table><thead><tr><th>Quem ministra</th><th>Música</th><th>Cantor/Banda/Versão</th><th>Tom Original</th><th>Tom Adaptado</th><th>Observações</th></tr></thead><tbody>';
            allResults.forEach(row => {
                html += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td>${row[5]}</td></tr>`;
            });
            html += '</tbody></table>';
            $("#results").html(html);
        }
    }).catch(function(error) {
        console.error("Erro ao buscar dados: ", error);
        $("#results").html('<p style="color: red;">Erro ao buscar dados. Tente novamente mais tarde.</p>');
    });
}

$(document).ready(function() {
    $("#searchInput").on("keypress", function(event) {
        if (event.which === 13) {
            event.preventDefault();
            search();
        }
    });
});


    // Limpa o campo de pesquisa quando a página é carregada
    window.onload = function() {
        document.getElementById("searchInput").value = ""
    };

    document.addEventListener('DOMContentLoaded', function () {
        const tableContainer = document.getElementById('table-container');
        const scrollRight = document.getElementById('scroll-right');
        const scrollLeft = document.getElementById('scroll-left');
    
        function checkScroll() {
            // Verifica se a tabela tem rolagem lateral
            if (tableContainer.scrollWidth > tableContainer.clientWidth) {
                scrollRight.style.display = 'inline';
            } else {
                scrollRight.style.display = 'none';
            }
        }
    
        // Verifica a rolagem lateral
        tableContainer.addEventListener('scroll', function () {
            if (tableContainer.scrollLeft > 0) {
                scrollLeft.style.display = 'inline';
            } else {
                scrollLeft.style.display = 'none';
            }
    
            if (tableContainer.scrollLeft + tableContainer.clientWidth >= tableContainer.scrollWidth) {
                scrollRight.style.display = 'none';
            } else {
                scrollRight.style.display = 'inline';
            }
        });
    
        // Função para rolar a tabela
        scrollRight.addEventListener('click', function () {
            tableContainer.scrollBy({ left: 100, behavior: 'smooth' });
        });
    
        scrollLeft.addEventListener('click', function () {
            tableContainer.scrollBy({ left: -100, behavior: 'smooth' });
        });
    
        // Verifica se há rolagem ao carregar a página
        checkScroll();
        window.addEventListener('resize', checkScroll);
    });
    