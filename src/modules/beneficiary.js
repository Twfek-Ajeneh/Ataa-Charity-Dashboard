class Beneficiary{
    constructor(id , name , idNumber , birthdate , phoneNumber , image , gender , socialStatus  
                , numberOfChildren , currentJob , salary , state , region , location , categories
                ,email , healthStatus , residentialStatus , generalStatus , status , projects){
        this.id = id; // number
        this.name = name; // string 
        this.idNumber = idNumber; //string
        this.birthdate = (birthdate ? new Date(birthdate) : undefined); // string to object
        this.phoneNumber = phoneNumber; //string 
        this.image = image; //string
        this.gender = gender; //string 
        this.socialStatus = socialStatus; // string
        this.numberOfChildren = numberOfChildren; // number
        this.currentJob = currentJob; // string
        this.salary = salary; // string
        this.state = state; //string
        this.region = region; //string
        this.location = location; //string
        this.categories = categories; // object [1 ,2 , 3 , 4]
        this.email = email; //string 
        this.healthStatus = healthStatus; //string
        this.residentialStatus  = residentialStatus; // string
        this.generalStatus = generalStatus; //string
        this.status = status; // string 
        this.projects = projects; //object [{id : 1 , name: 'مبادرة' , type: 'عام'}]
    }
}

export default Beneficiary;