// bugSolution.js
export async function getServerSideProps(context) {
  try {
    // Simulate an API call that might throw an error
    const res = await fetch('https://api.example.com/data');
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`API Error: ${errorData.message || res.statusText}`);
    }
    const data = await res.json();
    return {
      props: { data },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        error: error.message,
      },
    };
  }
}

export default function MyComponent({ data, error }) {
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      {/* Render your component here using the fetched data */}
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
