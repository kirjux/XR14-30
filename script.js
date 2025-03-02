function loadLatestFile() {
    fetch('tables/latest.json')  // Файл с информацией о последней таблице
        .then(response => response.json())
        .then(data => {
            let fileName = data.latestFile;
            if (fileName) {
                fetch(`tables/${fileName}`)
                    .then(response => response.arrayBuffer())
                    .then(data => {
                        let workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
                        displayData(workbook);
                    })
                    .catch(error => console.error('Ошибка загрузки файла:', error));
            } else {
                alert("Файл не найден!");
            }
        })
        .catch(error => console.error('Ошибка загрузки списка файлов:', error));
}

function displayData(workbook) {
    let sheetNames = workbook.SheetNames;
    let output = '<h2>Выберите дату</h2>';
    
    sheetNames.forEach(sheetName => {
        let sheet = workbook.Sheets[sheetName];
        let json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        
        if (json.length > 1) {
            let date = json[1][0]; 
            let projectCount = json.length - 1;
            output += `<p><strong>${date}</strong> (Всего изделий: ${projectCount})</p>`;
            output += `<button onclick="showProjects('${sheetName}')">Открыть</button>`;
        }
    });
    
    document.getElementById('dataDisplay').innerHTML = output;
}

function showProjects(sheetName) {
    alert(`Переход в проекты: ${sheetName}`);
}