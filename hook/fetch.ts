import { useEffect, useState } from "react"


export default function useFetch(url:string,method:string){

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await fetch(url,{
                        method
                    })
                    const data = await response.json()
                    if(!response.ok){
                        throw new Error(data.message)
                    }
                    setData(data)
                }catch(err:any){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url,method])

    return { data, error, loading }

}