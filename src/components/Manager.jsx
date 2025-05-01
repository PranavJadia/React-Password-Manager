import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const manager = () => {
    const ref = useRef()
    const passref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setpasswordarray] = useState([])

    const getpasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        const passwordss = await req.json()
        console.log(passwordss)
        setpasswordarray(passwordss);

    }

    useEffect(() => {
        getpasswords()
    }, []);


    //copy the text
    const copytext = (text) => {
        toast('copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }
    //saving the password
    const savepassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            await fetch("http://localhost:3000/", { method: "DELETE", header: { "Content-Type": "application/json" }, body:JSON.stringify({id:form.id}) })

            setpasswordarray([...passwordarray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body:JSON.stringify({...form,id:uuidv4()})})

            // localStorage.setItem("passwords", JSON.stringify([...passwordarray, { ...form, id: uuidv4() }]))
            // console.log([...passwordarray, form])

            setform({ site: "", username: "", password: "" })
            toast('saved successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('not valid length!', {
                theme: "dark"
            })
        }
    }
    //deleting the password
    const deletepassword = async (id) => {
        console.log("deleting the password with id", id)
        let c = confirm("do you really want to delete this password")
        if (c) {

            setpasswordarray(passwordarray.filter(item => item.id !== id))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", header: { "Content-Type": "application/json" }, body:JSON.stringify({id}) })
            // localStorage.setItem("passwords", passwordarray.filter(item => item.id !== id))
            toast('Password deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            // console.log([...passwordarray, form])
        }
    }
    const editpassword = (id) => {
        console.log("editing the password with id", id)
        setform(passwordarray.filter(i => i.id === id)[0])
        setpasswordarray({...passwordarray.filter(item => item.id !== id),id:id})
        toast('edit password', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    //input value change
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    //password showing icon logic
    const showpassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            passref.current.type = "password"
            ref.current.src = "icons/eye.png"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passref.current.type = "text"
        }

    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className="p-2 md:p-2 md:mycontainer min-h-[87vh]">
                <h1 className='text-4xl text font-bold text-center text-white'> <span className='text-green-400'>&lt;</span>
                    Pass
                    <span className='text-green-400'>OP/&gt;</span></h1>
                <p className='text-green-700 text-center'>Your Own Password Manager</p>
                <div className="flex flex-col p-4 text-white gap-6 items-center">
                    <input value={form.site} onChange={handlechange} name='site' placeholder='Enter Website URL' className='rounded-full border text-black border-green-500 w-full p-4 py-1' type="text" />
                    <div className="flex flex-col md:flex-row w-full gap-3">
                        <input value={form.username} onChange={handlechange} name='username' placeholder='Enter Username' className='rounded-full border text-black border-green-500 w-full p-4 py-1' type="text" />
                        <div className="relative">
                            <input ref={passref} value={form.password} onChange={handlechange} name='password' placeholder='Enter Password' className='rounded-full border text-black border-green-500 w-full p-4 py-1' type="password" />
                            <span className='text-black absolute pr-2 right-0 text-sm top-2' onClick={showpassword}><img ref={ref} width={20} src="icons/eye.png" alt="" /></span>
                        </div>
                    </div>
                    <button onClick={savepassword} className='flex items-center text-black justify-center rounded-full w-fit px-4 py-2 border border-green-600 bg-green-500 hover:bg-green-700'>
                        <lord-icon
                            src="https://cdn.lordicon.com/ggirntso.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#000000">
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className="passwords">
                    <h1 className='text-white font-bold text-xl py-4'>Your Passwords</h1>
                    {passwordarray.length === 0 && <div className='text-white'>No Passwrods to show</div>}
                    {passwordarray.length !== 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-5">
                            <thead className='bg-green-700'>
                                <tr className='text-white'>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Passwords</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordarray.map((item, index) => {
                                    return <tr key={item.index}>
                                        <td className='py-2 border border-white  text-center '>
                                            <div className="flex justify-center items-center">

                                                <a href="{item.site}">{item.site}</a>
                                                <div className='cursor-pointer lordiconcopy' onClick={() => { copytext(item.site) }}>
                                                    <span className="material-symbols-outlined pt-2  pl-1">
                                                        content_copy
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center '>
                                            <div className="flex justify-center items-center">
                                                <span>{item.username}</span>
                                                <div className='cursor-pointer lordiconcopy' onClick={() => { copytext(item.username) }}>
                                                    <span className="material-symbols-outlined pt-2  pl-1">
                                                        content_copy
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center '>
                                            <div className="flex justify-center items-center">
                                                <span>{item.password}</span>
                                                <div className='cursor-pointer lordiconcopy' onClick={() => { copytext(item.password) }}>
                                                    <span className="material-symbols-outlined pt-2  pl-1">
                                                        content_copy
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center '>
                                            <span className='cursor-pointer mx-1' onClick={() => { editpassword(item.id) }}><lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                colors="primary:#242424,secondary:#16c72e"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletepassword(item.id) }}><lord-icon
                                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                                trigger="hover"
                                                colors="primary:#242424,secondary:#16c72e"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default manager
