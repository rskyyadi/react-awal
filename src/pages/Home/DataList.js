function dataList(props){
    return(
        <ul>{
            props.data2.map( function(data){
                return <li key={data.id}>{data.title}</li>
            })
        }</ul>
    )
}

export default dataList