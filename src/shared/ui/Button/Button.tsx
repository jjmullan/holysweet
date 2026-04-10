interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

function Button({
  label,
  disabled = false,
  onClick,
}: ButtonProps): React.JSX.Element {
  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
