import { React } from "react";
import { Wrapper } from './Sidebar.styles';


const Sidebar = () => {
    const counters = Array.from({ length: 14 }, (_, index) => index);

    return (
        <Wrapper>
                <h3>title</h3>
                <ul>
                    {counters.map((item) => (
                        <li key={item + 1}>{item + 1}_pageIndex</li>
                    ))}
                </ul>
        </Wrapper>
    )
}

export default Sidebar;