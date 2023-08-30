class Employee{
    constructor(id , name , idNumber , email , phoneNumber , image , birthdate 
                , gender , category , jobState , state , region , loaction 
                , status , employeeDetails){  
        this.id = id; // number
        this.name = name; //string 
        this.idNumber = idNumber; // string
        this.email = email; //string 
        this.phoneNumber = phoneNumber; // string
        this.image = image; //string
        this.birthdate = (birthdate ? new Date(birthdate) : undefined); // object to string
        this.gender = gender; // string 
        this.category = category; //string
        this.jobState = jobState; //string
        this.state = state; //string
        this.region = region; //string
        this.location = loaction; //string
        this.status = status; //string
        this.employeeDetails = employeeDetails; //string
    }   
}

export default Employee;