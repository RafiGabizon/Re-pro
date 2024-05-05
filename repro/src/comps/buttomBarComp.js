import React, {Component} from "react";


class ButtomBar extends Component {
    render(){
        return(
            <div className="buttom_bar">
                <div className="buttom_bar_links">
                    <p className="buttom_bar_text">! תודה שבחרתם ריפרו<br></br>
                    ,אנחנו זמינים בשבילכם כל העת לשאלות<br></br>.ייעוץ, הכוונה ובקשות נוספות </p>
                    <div className="buttom_bar_links">
                    <a href="/about" className="Link-1">אודות</a> <a href="/employers" className="Link-6">מעסיקים</a><br></br>
                    <a href="/contact" className="Link-2">צור קשר</a> <a href="/job_abroad" className="Link-7">עבודות בחו"ל</a><br></br>
                    <a href="/terms" className="Link-3">תנאי שימוש</a> <a href="/articles" className="Link-8">כתבות</a><br></br>
                    <a href="/privacy" className="Link-4">מדיניות פרטיות</a> <a href="/q_a" className="Link-9">שאלות ותשובות</a><br></br>
                    <a href="/faq" className="Link-5">שאלות נפוצות</a> <a href="/log_in" className="Link-10">איזור אישי</a><br></br>

                    </div>
                    
                </div>








            </div>
        )
    }
}


export default ButtomBar;