class Project{
    constructor(id , name , image , startDate , endDate , location , type , categories , projectGoals , projectDescription , status , target , currentBalance , projectEmployees , projectBeneficiaries){
        this.id = id; // number
        this.name = name; // string
        this.image = image; // string 
        this.startDate = (startDate ? new Date(startDate) : undefined); // string to date object
        this.endDate = (endDate ? new Date(endDate) : undefined); // string to date object
        this.location = location; // string
        this.type = type; // string
        this.categories = categories; // object [1 , 2, ,3 , 4]
        this.projectGoals = projectGoals // string 
        this.projectDescription = projectDescription // string 
        this.status = status; // string
        this.target = target; // string
        this.currentBalance = currentBalance; // string
        this.projectEmployees = projectEmployees; // object [{id : 1 , name : 'توفيق' , image: 'gasdgsd' , type: 'خاص' , jobStatus: 'مدير مشاريع' , status: 'مقبول'}]
        this.projectBeneficiaries = projectBeneficiaries; // object [{id: 1 , name: 'توفيق' , image: 'asgg' , status: 'مقبول' , state: 'دمشق'}]
    }
}

export default Project;