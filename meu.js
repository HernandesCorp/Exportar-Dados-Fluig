document.getElementById('exportBtn').addEventListener('click', function() {
    // Pega o conteúdo da área de texto
    var text = document.getElementById('dataInput').value;

    // Cria uma variável para armazenar os dados formatados
    var csvData = [];

    // Adiciona os títulos na primeira linha
    var titles = ['ID', 'Data', 'Status', 'Data Final', 'Descrição', 'Fornecedor', 'Valor do Pagamento'];
    csvData.push(titles.join(']'));  // Títulos separados por ']'

    // Processa o conteúdo do texto colado
    // Extraímos as linhas do HTML e obtemos os valores de cada célula de cada linha (<tr>)
    var regex = /<tr>(.*?)<\/tr>/g;
    var match;
    while ((match = regex.exec(text)) !== null) {
        var row = match[1];
        var cells = row.match(/<td>(.*?)<\/td>/g).map(function(cell) {
            // Remove as tags HTML e pega apenas o conteúdo
            var cleanCell = cell.replace(/<.*?>/g, '');

            // Retorna o valor limpo, sem codificação extra
            return cleanCell;
        });
        csvData.push(cells.join(']')); // Altere a vírgula por ']' como separador
    }

    // Converte a matriz csvData para uma string CSV
    var csvString = csvData.join('\n');

    // Garante que a codificação UTF-8 seja utilizada no arquivo CSV
    var utf8Bom = '\uFEFF';  // Byte Order Mark (BOM) para UTF-8

    // Cria um link para fazer o download do CSV
    var blob = new Blob([utf8Bom + csvString], { type: 'text/csv; charset=utf-8' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'dados.csv';

    // Simula o clique para download
    link.click();
});
