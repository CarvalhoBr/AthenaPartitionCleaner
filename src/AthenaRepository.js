const AthenaService = require("./AthenaService");

class AthenaRepository {
    
    constructor(){
        this.athenaService = new AthenaService().athena
    }

    async execute(querie){
        return await this.athenaService.execute(querie).toPromise()
    }
    

}
module.exports = AthenaRepository