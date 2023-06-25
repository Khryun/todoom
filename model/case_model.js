const pgClient = require("./connect");

pgClient.getAll = result => {
    sql.query('SELECT * FROM ToDo', (err,res) => {
        if (err) {
            console.log("Ошибка :", err)
            res(null, err);
            return;
        }
        console.log('Дела: ', res);
        result(null, res);
    }); 
};

pgClient.getById = (caseID, result) => {
    sql.query(`SELECT * FROM TODO WHERE id = ${caseID}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
    
        if (res.length) {
            console.log('Дело найдено: ', res[0]);
            result(null, res[0]);
            return;
        }
    
        result({ kind: 'not_found' }, null);
    });
};

pgClient.createCase = (title, description, isDone, result) => {
    sql.query(`INSERT INTO ToDo(title, description, isDone) VALUES (${title}, ${description}, ${isDone})`, (err, res) => {
        if (err) {
            console.log('Ошибка: ', err);
            result(err, null);
            return;
        }

        console.log('Дело добавлено', {id: res.insertId, title, description, isDone});
        result(null, {id: res.insertId, title, description, isDone});
    });
};

pgClient.updateCase = (id, title, description, isDone, result) => {
    sql.query(`UPDATE ToDo SET title = ${title}, description = ${description}, isDone = ${isDone} WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('Ошибка: ', err);
            result(err, null);
            return;
        }

        
        if (res.affectedRows == 0) {
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('Обновлено дело №', id);
        result(null, res);
    });
};

pgClient.removeAll = result => {
    sql.query('DELETE FROM ToDo', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
    
        console.log(`Удалено дело номер ${res.affectedRows}`);
        result(null, res);
    });
};