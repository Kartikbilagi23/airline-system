import React from 'react'
import { useLocation } from 'react-router-dom'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}
const SearchResult = () => {
    const query=useQuery().get("query")

    const flight=[
        {from:"Mumbai",to:"Delhi",price:4500},
        {from:"Pune",to:"Bangalore",price:3200}
    ]
    const result=flight.filter(f=>query&&
        (f.from.toLowerCase().includes(query.toLowerCase())||
        f.to.toLowerCase().includes(query.toLowerCase()))
    )
  return (
    <div>
        <h2>Result for :{query}</h2>
        {
            result.map((f,i)=>(
                <div key={i}>
                    {f.from} → {f.to} | {f.price}
                </div>
            ))
        }
    </div>
  )
}

export default SearchResult