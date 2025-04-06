export default function ProfileSettingsInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  textarea = false,
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full mt-1 px-3 py-2 border rounded-md"
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full mt-1 px-3 py-2 border rounded-md"
        />
      )}
    </div>
  );
}
