import { Add, AppRegistration, ArrowRight, Cancel, Check, Edit, Login, Logout, Mail, Person } from '@mui/icons-material'
import React from 'react'

const Button = (props) => {

    switch(props.type)
    {
        case "logout":
            return(
                <div className='buttons border-secondary bg-white50'>
                    <Logout className="text-lg text-primary" />
                    <p className='text-primary'>Logout</p>
                </div>
            )

        case "register":
            return(
                <div className='buttons border-secondary gap-2 bg-white50'>
                    <AppRegistration className="text-lg text-primary" />
                    <p className='text-primary'>Register</p>
                </div>
            )
        
        case "login":
            return(
                <div className='buttons px-8 border-secondary bg-primary'>
                    <Login className="text-lg text-white50" />
                    <p className='text-white50'>Login</p>
                </div>
            )

        case "loginDis":
            return(
                <div className='buttons px-8 border-grey50 bg-grey50'>
                    <Login className="text-lg text-white50" />
                    <p className='text-white50'>Login</p>
                </div>
            )

        case "primary":
            return(
                <div className='buttons border-secondary bg-primary'>
                    <p className='text-white50'>{props.label}</p>
                    <ArrowRight className="text-xl text-white50" />
                </div>
            )

        case "text":
            return(
                <div className='cursor-pointer text-center text-base text-primary'>{props.label}</div>
            )

        case "profile":
        return(
            <div className='buttons border-secondary gap-2 bg-primary'>
                <Person className="text-lg text-white50" />
                <p className='text-white50'>Profile</p>
            </div>
        )

        case "mail":
        return(
            <div id='mail' className={`buttons border-secondary gap-2 bg-primary ${props.label==="none"? `py-4` : ``}`}>
                <Mail className="text-lg text-white50" />
                {props.label==="none"? '':<p className='text-white50'>{props.label}</p>}
            </div>
        )

        case "add":
        return(
            <div className='buttons border-secondary gap-2 bg-primary'>
                <Add className="text-lg text-white50" />
                <p className='text-white50'>{props.label}</p>
            </div>
        )

        case "edit":
        return(
            <div className='buttons border-secondary bg-primary'>
                <Edit className="text-lg text-white50" />
                <p className='text-white50'>{props.label}</p>
            </div>
        )

        case "accept":
        return(
            <div className={`buttons border-green gap-2 bg-green ${props.label==="none"? `py-4` : ``}`}>
                <Check className="text-lg text-white50" />
                {props.label==="none"? '':<p className='text-white50'>{props.label}</p>}
            </div>
        )

        case "decline":
        return(
            <div className={`buttons border-red gap-2 bg-red ${props.label==="none"? `py-4` : ``}`}>
                <Cancel className="text-lg text-white50" />
                {props.label==="none"? '':<p className='text-white50'>{props.label}</p>}
            </div>
        )
    }
}

export default Button