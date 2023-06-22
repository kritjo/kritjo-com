import {useEffect} from "react";

const Contact = (props) => {
    useEffect(() => {
        props.set_page_title("Contact")
    })

    return (
        <div>
            <a href="mailto:kritjo@kritjo.com">kritjo@kritjo.com</a>
            <hr/>
            <h2>Signing and encryption (optional but recommended)</h2>
            <p><b>Preferred</b>: Use my <a href="/kritjo@kritjo.com.cer">certificate</a> and S/MIME</p>
            <p>Alternative: Use my <a href="/kritjo@kritjo.com.gpg">key</a> for GPG</p>
        </div>
    )
}

export default Contact