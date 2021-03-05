function createDates(){
    const initialDate = new Date().toISOString().split('T')[0]
    const finalDate = new Date('2020-12-17').toISOString().split('T')[0]

    const dates = [initialDate]
    let currentDate = initialDate

    //Cria datas no formato YYYY-MM-DD
    do {
        currentDate = new Date(currentDate)
        currentDate.setDate(currentDate.getDate()-1)
        currentDate = currentDate.toISOString().split('T')[0]

        dates.push(currentDate)
    }while(currentDate !== finalDate)

    return dates
}

function createPartitions(dates){
    let partitions = []

    //Cria linha da query
    dates.forEach((date) => {
        partitions.push(`PARTITION (partition_date = date '${date}')`)
    })

    return partitions
}

function createQueries(){
    const dates = createDates()
    const partitions = createPartitions(dates)

    let query = `ALTER TABLE ${process.env.ATHENA_DATABASE}.${process.env.ATHENA_TABLE} DROP`
    let queries = []

    partitions.forEach(partition => {
        queries.push(`${query} ${partition}`)
    })

    return queries
}

module.exports = createQueries