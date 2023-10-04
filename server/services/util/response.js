export let setResponse = (obj, response, status=200)=>{
    response.status(status)
    response.json(obj)
}

export let setError = (err, response, status=400)=>{
    response.status(status)
    response.json(err)
}
