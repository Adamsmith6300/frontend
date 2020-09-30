import React from "react";
import { Button } from "semantic-ui-react";
import Link from "next/link"


const index = (props) => {
    return (
        <div className="text-center mt-6">
            <p className="text-2xl">Successfully signed up!</p>
            <p className="mb-4">Please check your email.</p>
            <Link href='/login'>
                <Button>Login</Button>
            </Link>
        </div>
    )
}

export default index