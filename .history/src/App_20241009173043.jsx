import NavBar from './components/NavBar'; 
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
