import styles from './styles.module.css'

type DefaultInput = {
    id: string,
    labelText: string,
    placeholder: string,
} & React.ComponentProps<'input'> 

export function DefaultInput({ type, id, labelText, placeholder, ...props }: DefaultInput) {
  return (
    <div className={styles.defaultInputBox}>
      <label htmlFor={id}>{labelText}:</label>
      <input className={styles.input} id={id} type={type} placeholder={placeholder} {...props} />
    </div>
  );
}
