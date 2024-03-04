import { Switch, Match } from "solid-js";
import { createSignal, createEffect } from 'solid-js'
import Flag from "./flag";
import "./style.css";

function Searchbar() {

    const [mode, setMode] = createSignal("default");
    const [selectedOption, setSelectedOption] = createSignal("Toll-free");
    let timerId;

    createEffect(() => {
        return () => {
            clearTimeout(timerId);
        };
    });

    const handleInputChange = (event) => {
        clearTimeout(timerId);
        setMode("loading");

        timerId = setTimeout(() => {
            if (event.target.value !== '') {
                setMode("focus");
            } else {
                setMode("default");
            }
        }, 500);
    };

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    }

    return (
        <div class="inline-flex px-2 py-1 items-center gap-12 rounded-full bg-white shadow-md" >
            <div class="inline-flex items-center" style={{ width: '312px', height: '28px', gap: "8px" }}>

                <Flag />

                <div style={{ gap: '8px' }} class="inline-flex items-center">
                    <select onChange={handleDropdownChange} 
                    className=" dropdown h-20 text-[#86868B] font-inter text-xs font-normal focus:outline-none truncate border-none pb-0 !important">
                        <optgroup label="Options">
                            <option value="Toll-free">Toll Free</option>
                            <option value="City">City</option>
                            <option value="Region">Region</option>
                        </optgroup>
                    </select>

                    <div className="vertical-line"></div>

                    <input onInput={handleInputChange} type="text" style={{ width: "166px" }}
                        className="text-[#86868B] focus:text-[#1D1D1F] font-inter text-xs focus:outline-none font-normal leading-5 tracking-tighter"
                        placeholder={`search by ${selectedOption()}`} />
                </div>

                <div class={`inline-flex p-1 justify-center items-center space-x-10 rounded-full ${mode() === "default" ? "" : "bg-[#F5F5F5]"}`}>
                    <Switch>
                        <Match when={mode() === "default"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5614 9.64913C14.5614 12.3621 12.3621 14.5614 9.6491 14.5614C6.93612 14.5614 4.73682 12.3621 4.73682 9.64913C4.73682 6.93616 6.93612 4.73685 9.6491 4.73685C12.3621 4.73685 14.5614 6.93616 14.5614 9.64913ZM14.5838 13.5914C15.4481 12.5109 15.9649 11.1404 15.9649 9.64913C15.9649 6.16102 13.1372 3.33334 9.6491 3.33334C6.16099 3.33334 3.33331 6.16102 3.33331 9.64913C3.33331 13.1372 6.16099 15.9649 9.6491 15.9649C11.1403 15.9649 12.5109 15.4481 13.5913 14.5838L15.4687 16.4611C15.7427 16.7352 16.1871 16.7352 16.4611 16.4611C16.7352 16.1871 16.7352 15.7428 16.4611 15.4687L14.5838 13.5914Z" fill="#86868B" />
                            </svg>
                        </Match>
                        <Match when={mode() === "focus"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7.5 15L12.5 10L7.5 5" stroke="#1D1D1F" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </Match>
                        <Match when={mode() === "loading"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10H15.8333C15.8333 8.4529 15.2188 6.96917 14.1248 5.87521C13.0308 4.78125 11.5471 4.16667 10 4.16667V2.5Z" fill="#1D1D1F" />
                            </svg>
                        </Match>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Searchbar;