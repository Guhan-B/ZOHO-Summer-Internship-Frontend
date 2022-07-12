import React from 'react';

import styles from "./styles.module.scss";

const InputField = (props) => {
    if(props.type === "text" || props.type === "date" || props.type === "time")
        return <Input {...props}/>
    
    if(props.type === "password")
        return <Password {...props}/>

    if(props.type === "select")
        return <Select {...props}/>
    
    if(props.type === "textarea")
        return <TextArea {...props}/>
}

const Input = (props) => {
    const [isFocus, setIsFocus] = React.useState(false);

    const classes = [styles.wrapper];

    if(isFocus)
        classes.push(styles.focus);
    
    if(props.error)
        classes.push(styles.error);

    return (
        <div className={classes.join(" ")}>
            { 
                props.label && 
                <label htmlFor={props.id}>{props.label} { props.required && <span className={styles.star}>*</span>}</label> 
            }

            <div>
                <input 
                    type={props.type}
                    id={props.id} 
                    onFocus={() => setIsFocus(true)} 
                    onBlur={() => setIsFocus(false)} 
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    onChange={(e) => props.onChange(e.target.value)}
                    value={props.value}
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
    
    if(props.error)
        classes.push(styles.error);
    
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
                    onChange={(e) => props.onChange(e.target.value)}
                    value={props.value}
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

    const classes = [styles.wrapper, styles.select];

    if(isFocus)
        classes.push(styles.focus);
    
    if(props.error)
        classes.push(styles.error);

    const clickHandler = () => {
        setIsFocus(!isFocus);
    }

    return (
        <div className={classes.join(" ")} onClick={clickHandler}>
            { 
                props.label && 
                <label htmlFor={props.id}>{props.label} { props.required && <span className={styles.star}>*</span>}</label> 
            }
            <div>
                <input type="text" id={props.id} value={props.value.label} placeholder={props.placeholder} disabled/>
                {
                    isFocus &&
                    <ul className={styles.options}>
                        { 
                            props.options.map(
                                (option, idx) => <li onClick={() => props.onChange(option)} key={idx}>{option.label}</li>
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

    const classes = [styles.wrapper];

    if(isFocus)
        classes.push(styles.focus);

    if(props.error)
        classes.push(styles.error);
    
    const onChange = (e) => {
        if(e.target.value.length <= props.limit)
            props.onChange(e.target.value)
    }

    return (
        <div className={classes.join(" ")}>
            { 
                props.label && 
                <label htmlFor={props.id}>{props.label} { props.required && <span className={styles.star}>*</span>}</label> 
            }

            <span className={styles.character_count}>{props.value.length} / {props.limit}</span>

            <div>
                <textarea 
                    id={props.id} 
                    onFocus={() => setIsFocus(true)} 
                    onBlur={() => setIsFocus(false)} 
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    rows={props.height}
                    onChange={onChange}
                    value={props.value}
                >  
                </textarea>
                { props.icon && <props.icon className={styles.icon}/> }
            </div>
        </div>
    )
}

export default InputField;