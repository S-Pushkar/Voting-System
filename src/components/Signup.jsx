import React from "react";
import { Link } from "react-router-dom";

export default function Signup({ log, setLog }) {
    return (
        <div className="flex flex-col items-center px-8 lg:px-20 md:text-base text-xs lg:text-base">
            <div className="lg:w-1/3 sm:w-1/2 bg-[#646464] rounded-xl mb-8 p-8">
                <form>
                    <div>
                        <div className="mr-2 text-xs lg:text-lg">
                                Name : 
                        </div>
                        <input className="rounded p-1 mt-4 mb-4 lg:w-1/2" type="text" name="name" placeholder="Username" required autoFocus/>
                    </div>
                    <div>
                        <div className="mr-2 text-xs lg:text-lg" >
                            Email : 
                        </div>
                        <input className="rounded p-1 mt-4 mb-4 lg:w-1/2" type="email" name="email" placeholder="example@gmail.com" required/>
                    </div>
					<div>
                        <div className="mr-2 text-xs lg:text-lg">
                            Password : 
                        </div>
                        <input className="rounded p-1 mt-4 mb-4 lg:w-1/2" type="password" name="password1"  required/>
                    </div>
					<div>
                        <div className="mr-2 text-xs lg:text-lg">
                            Confirm Password : 
                        </div>
                        <input className="rounded p-1 mt-4 mb-4 lg:w-1/2" type="password" name="password2"  required/>
                    </div>
					<div>
                    <button className="bg-[rgb(227,223,223)] m-2 shadow-md text-black px-2 py-1 hover:bg-gray" type="submit">Submit</button>
                    <button className="bg-[rgb(227,223,223)] m-2 shadow-md text-black px-2 py-1 hover:bg-gray" type="reset">Reset</button>
					</div>
					<div>
						<h4 style={{ fontSize: '16px' }}>Already have an account?</h4>
					</div>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<h4 style={{ fontSize: '16px' }}>Click&nbsp;</h4>
                        <Link to="/log-in" style={{ fontSize: '16px' }}>Here</Link>
						<h4 style={{ fontSize: '16px' }}>&nbsp;to login</h4>
					</div>
                </form>
            </div>
        </div>
    );
}