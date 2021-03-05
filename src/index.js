const AthenaRepository = require('./AthenaRepository')
const createQueries = require('./createQueries')

require('dotenv').config()

const athenaRepository = new AthenaRepository

async function main(){
    const queries = createQueries()

    for(let c in queries){
        try {
            await athenaRepository.execute(queries[c])
        } catch (error) {
            throw new Error(error)
        }
    }
}

main()
