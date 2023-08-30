//import Css
import './DashboardPageHeader.css';

function DashboardPageHeader(props){
    
    const handleClick = (e) => {
        const list = document.querySelector('.dashboard-page-header-list').children;
        for(let i = 0 ; i < list.length ; i++) list[i].classList.remove('dashboard-page-header-list-active');
        e.target.classList.toggle('dashboard-page-header-list-active');
    }

    return(
        <div className="dashboard-page-header">
            <h2 className="dashboard-page-header-title">{props.mainTitle}</h2>
            <p>{props.subTitle}</p>
            <ul className='dashboard-page-header-list'>
                <li onClick={(e) => {handleClick(e); if(props.onClickList) props.onClickList(0)}} 
                    className='dashboard-page-header-list-active'>
                    {props.listItem[0]}
                </li>
                {props.listItem[1] && 
                    <li onClick={(e) => {handleClick(e); if(props.onClickList) props.onClickList(1)}} >
                        {props.listItem[1]}
                    </li>
                }
                {props.listItem[2] && 
                    <li onClick={(e) => {handleClick(e); if(props.onClickList) props.onClickList(2)}}>
                        {props.listItem[2]}
                    </li>
                }
                {props.listItem[3] && 
                    <li onClick={(e) => {handleClick(e); if(props.onClickList) props.onClickList(3)}}>
                        {props.listItem[3]}
                    </li>
                }
            </ul>
        </div>
    );
}

export default DashboardPageHeader;