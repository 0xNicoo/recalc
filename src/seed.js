import { Operation, createTables } from "./models.js";

export async function seed() {
    await createTables()

    Operation.bulkCreate([
        { name: "ADD" },
        { name: "SUB" },
        { name: "MUL" },
        { name: "DIV" },
        { name: "POW" },
        { name: "SQRT" },
        { name: "BIN" }
    ])
}

if (process.env.NODE_ENV !== 'test') {
    seed()
}