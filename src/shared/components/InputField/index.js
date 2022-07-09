import React, { useRef } from 'react';

import styles from "./styles.module.scss";

const InputField = (props) => {
    if(props.type === "text")
        return <Text {...props}/>
    
    if(props.type === "password")
        return <Password {...props}/>

    if(props.type === "select")
        return <Select {...props}/>
    
    if(props.type === "textarea")
        return <TextArea {...props}/>
    
    if(props.type === "date")
        return <Date {...props}/>
    
    if(props.type === "time")
        return <Time {...props}/>
}

const Text = (props) => {
    const [isFocus, setIsFocus] = React.useState(false);

    const classes = [styles.wrapper];

    if(isFocus)
        classes.push(styles.focus);

    return (
        <div className={classes.join(" ")}>
            { 
                props.label && 
                <label htmlFor={props.id}>{props.label} { props.required && <span className={styles.star}>*</span>}</label> 
            }

            <div>
                <input 
                    type="text" 
                    id={props.id} 
                    onFocus={() => setIsFocus(true)} 
                    onBlur={() => setIsFocus(false)} 
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                />
                { props.icon && <props.icon className={styles.icon}/> }
            </div>
        </div>
    )
}

const Password = (props) => {
    const [isFocus, setIsFocus] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const classes = [styles.wrapper];
    const checkboxClasses = [styles.checkbox];

    if(isFocus)
        classes.push(styles.focus);
    
    if(showPassword)
        checkboxClasses.push(styles.filled);

    return (
        <div className={classes.join(" ")}>
            { 
                props.label && 
                <label htmlFor={props.id}>{props.label} { props.required && <span className={styles.star}>*</span>}</label> 
            }

            <div>
                <input 
                    type={showPassword? "text" : "password"} 
                    id={props.id} 
                    onFocus={() => setIsFocus(true)} 
                    onBlur={() => setIsFocus(false)}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                />
                <props.icon className={styles.icon}/>
            </div>

            <span className={styles.password_toggle}>
                <input type="checkbox" id="show" checked={showPassword} onChange={(e) => setShowPassword(!showPassword)}/>
                <span className={checkboxClasses.join(" ")} onClick={(e) => setShowPassword(!showPassword)}>
                    <span></span>
                </span>
                <label htmlFor="show">Show Password</label>
            </span>
        </div>
    );
}

const Select = (props) => {
    const [isFocus, setIsFocus] = React.useState(false);
    const [value, setValue] = React.useState({label: "", value: ""})

    const classes = [styles.wrapper];

    if(isFocus)
        classes.push(styles.focus);

    const clickHandler = () => {
        setIsFocus(!isFocus);
    }

    const selectHandler = (value) => {
        setValue(value);
    }

    return (
        <div className={classes.join(" ")} onClick={clickHandler}>
            { 
                props.label && 
                <label htmlFor={props.id}>{props.label} { props.required && <span className={styles.star}>*</span>}</label> 
            }
            <div>
                <input type="text" id={props.id} value={value.label} placeholder={props.placeholder} disabled/>
                {
                    isFocus &&
                    <ul className={styles.options}>
                        { 
                            props.options.map(
                                (option, idx) => <li onClick={() => selectHandler(option)} key={idx}>{option.label}</li>
                            ) 
                        }
                    </ul>
                }
                {props.icon && <props.icon className={styles.icon}/>}
            </div>
        </div>
    );
}

const TextArea = (props) => {
    const [isFocus, setIsFocus] = React.useState(false);
    const [count, setCount] = React.useState(0);

    const classes = [styles.wrapper];

    if(isFocus)
        classes.push(styles.focus);

    return (
        <div className={classes.join(" ")}>
            { 
                props.label && 
                <label htmlFor={props.id}>{props.label} { props.required && <span className={styles.star}>*</span>}</label> 
            }

            <span className={styles.character_count}>{count} / {props.limit}</span>

            <div>
                <textarea 
                    id={props.id} 
                    onFocus={() => setIsFocus(true)} 
                    onBlur={() => setIsFocus(false)} 
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    rows={props.height}
                >  
                </textarea>
                { props.icon && <props.icon className={styles.icon}/> }
            </div>
        </div>
    )
}

const Date = (props) => {
    const [isFocus, setIsFocus] = React.useState(false);

    const classes = [styles.wrapper];

    if(isFocus)
        classes.push(styles.focus);

    return (
        <div className={classes.join(" ")}>
            { 
                props.label && 
                <label htmlFor={props.id}>{props.label} { props.required && <span className={styles.star}>*</span>}</label> 
            }

            <div>
                <input 
                    type="date" 
                    id={props.id} 
                    onFocus={() => setIsFocus(true)} 
                    onBlur={() => setIsFocus(false)} 
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                />
                { props.icon && <props.icon className={styles.icon}/> }
            </div>
        </div>
    )
}

const Time = (props) => {
    const [isFocus, setIsFocus] = React.useState(false);

    const classes = [styles.wrapper];

    if(isFocus)
        classes.push(styles.focus);

    return (
        <div className={classes.join(" ")}>
            { 
                props.label && 
                <label htmlFor={props.id}>{props.label} { props.required && <span className={styles.star}>*</span>}</label> 
            }

            <div>
                <input 
                    type="time" 
                    id={props.id} 
                    onFocus={() => setIsFocus(true)} 
                    onBlur={() => setIsFocus(false)} 
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                />
                { props.icon && <props.icon className={styles.icon}/> }
            </div>
        </div>
    )
}

export default InputField;