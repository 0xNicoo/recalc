import { Sequelize, DataTypes } from 'sequelize';

var storageDB;

if(process.env.NODE_ENV === 'test'){
    storageDB = ":memory:"
}else{
    storageDB = './db.sqlite3'
}

const inTest = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'test:e2e';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: !inTest,
    storage: storageDB
})

export const History = sequelize.define('History', {
    firstArg: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    secondArg: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    result: {
        type: DataTypes.NUMBER,
        allowNull: true
    },
    error: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

export const Operation = sequelize.define('Operation', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Operation.hasMany(History)
History.belongsTo(Operation)

export async function createHistoryEntry({ firstArg, secondArg, operationName, result, error }) {
    const operation = await Operation.findOne({
        where: {
            name: operationName
        }
    });

    return History.create({
        firstArg,
        secondArg,
        result,
        OperationId: operation.id,
        error
    })
}


export async function allHistory(filter, page = 1, size = 10){

    const includeOptions = [{
        model: Operation
    }];

    if (filter !== undefined) {
        includeOptions[0].where = { name: filter };
    }

    const histories = await History.findAll({
        include: includeOptions,
        limit: size,
        offset: (page - 1) * size
    });
    
    return histories; 
}

export async function deleteHistory(filter, page = 1, size = 10){
    
    const histories = await allHistory(filter, page, size)

    histories.forEach(async history => {
        await history.destroy({
            where: {}
        });
    })
}

export function createTables() {
    return Promise.all([
        History.sync({ force: true }),
        Operation.sync({ force: true })
    ]);
}



export function findByID(id) {
    return History.findByPk(id);
}