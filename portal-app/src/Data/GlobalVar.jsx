const getGlobalVars = async() => {
    let vars = {};

    //fetch aws values
    try{
        const response = await fetch("https://f0ll5x1c4l.execute-api.us-east-1.amazonaws.com/getGlobalAWSVars")
        if (response.ok){
            Object.assign(vars, {...await response.json()});
        }else{
            console.log("Error getting global variables.");
            alert("An error occured while retreiving initial data. Try loading the page again. If the error persists, please contact info@iskamortgage.com.")
        }
    }catch (error){
        console.log("Error getting global variables.", error);
        alert("An error occured while retreiving initial data. Try loading the page again. If the error persists, please contact info@iskamortgage.com.")

    }
    return(
        vars
    );
}

let GlobalVar = await getGlobalVars()

export default GlobalVar;
