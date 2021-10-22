import Link from "next/link";

export default function GenreMenu({ categories }) {
  return (
    <ul>
      {categories.Genre.map((genre, genreIndex) => {
        
        return (
          <li
            key={genreIndex}
            className="cursor-pointer	 justify-center text-left pr-2"
          >
            <p>{`> ${genre.name}`}</p>
            {categories.Type.map((type, typeIndex) => {
              if (type.parent.includes(genre.name)) {
                return (
                  <li key={typeIndex} className="hidden">
                    {type.name}
                  </li>
                );
              }
            })}
          </li>
        );
      })}
    </ul>
  );
}
