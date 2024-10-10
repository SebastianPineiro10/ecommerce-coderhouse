import NavBar from './components/NavBar'; // Asegúrate de que la ruta sea correcta
import ItemListContainer from './components/ItemListContainer';


const App = () => {
  return (
    <div>
      <NavBar /> 
      <ItemListContainer greeting="¡Hola! Bienvenido a SP Deposito Dental tu proovedor de productos odontologicos de confianza." />
    </div>
  );
};

export default App;
