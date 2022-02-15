import React from "react";
import * as FaIcons from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {statusCardData} from './statusCardData';
import StatusCards from './statusCard';
import Chart from 'react-apexcharts';


const chartOption = {
    series: [{
        name: "Hadir",
        data: [40.70,20,90,36,80,30,91,60]
    },{
        name: "Tidak Hadir",
        data: [40,30,70,80,40,16,20,50,13]
    }],
    options: {
        color: ['6ab04c', '2980b9'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}

export default function Das() {


//Style Css
    const main_container = {marginLeft:'auto', marginRight:'auto', marginTop:'-600px'}
    const container = {
        marginTop:'120px',
        marginRight:'auto',
        marginLeft:'auto',
        marginBottom:'30px',
        width:'100%',
        height:'100px',
        display:'flex',
        justifyContent:'space-between',
        backgroundColor:'white',
        padding:'1rem',
        borderRadius:'1rem',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 8px 24px',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
        transition: 'color 0.5s ease 0s'
    }

    const container1 = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:'1rem',
        borderRight:'3px solid rgb(191, 191, 191)',
        zIndex: 1,
        paddingRight:'4rem',
        height:'65px'
    }

    const icon = {
        padding:'5px',
        paddingTop:'10px',
        paddingLeft:'15px',
        paddingRight:'15px',
        zIndex: 1,
        fontSize:'1.5rem',
        borderRadius:'1rem',
        color:'black',
        backgroundColor:'rgb(234, 233, 233)',
        marginTop:'13px',
        marginBottom:'13px',
    }

    const p11 = {
        color:'black',
        zIndex: 1
    }

    const p1 = {
        color:'black',
        marginTop:'-20px',
        zIndex: 1,
        fontSize:'20px'
    }

    const teks = {
        marginTop:'20px',
        marginLeft:'20px',
        zIndex: 1
    }

    const data = [
        {
            icon:<FaIcons.FaMale />,
            title: 'Mahasiswa Pria',
            value: '9.995'
        },
        {
            icon:<FaIcons.FaFemale/>,
            title: 'Mahasiswa Wanita',
            value: '10.000'
        },
        {
            icon:<FaIcons.FaUserClock />,
            title: 'Waktu Belajar',
            value: '12 Jam'
        },
        {
            icon:<FaIcons.FaBook />,
            title: 'Materi Belajar',
            value: '5.172'
        }
    ]

    return(
        <div className="container" style={main_container}>
            <div className="riski" style={container}>
                {
                    data.map((datas) => {
                        return(
                            <div className="row">
                                <div style={container1}>
                                    <Link style={{display:'flex', textDecoration:'none'}}>
                                        <div className="icon" style={icon}>{datas.icon}</div>
                                        <div className="teks" style={teks}>
                                            <p style={p11}>{datas.title}</p>
                                            <p style={p1}><b>{datas.value}</b></p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mt-3">
                <div>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                {
                                    statusCardData.map((item, index) => (
                                        <div className="col-6">
                                            <StatusCards 
                                                icon={item.icon}
                                                count={item.count}
                                                title={item.title}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="card full">
                                <Chart 
                                    options={chartOption.options}
                                    series={chartOption.series}
                                    type="line"
                                    height="100%"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}