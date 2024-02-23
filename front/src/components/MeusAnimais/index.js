import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  
import styles from "./index.module.css";
import SearchBar from '../SearchBar';
import { AdicionarAnimalWhiteButton } from "../WhiteButton";
import { getAllAnimal, deleteAnimal } from '../../../services/animalService';
import VoltarButton from '../VoltarButton';
import ExcluirButton from '../ExcluirButton';

function MeusAnimaisList() {
    const [animais, setAnimais] = useState([]);
    
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const animaisData = await getAllAnimal();
                setAnimais(animaisData);
            } catch (error) {
                console.error('Erro ao buscar animais:', error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteAnimal = async (animalId) => {
        try {
            await deleteAnimal(animalId);
            setAnimais(animais.filter(animal => animal.id !== animalId));
            window.location.reload();
        } catch (error) {
            console.error('Erro ao excluir a animal:', error);
        }
    };

    return (
        <div className={styles.container}>
            < VoltarButton />
            
            <h1>Animais</h1>

            <div className={styles.navbar}>
                <SearchBar className={styles.pesquisa} />
                <AdicionarAnimalWhiteButton />
            </div>

            {animais.length === 0 ? (
                <p>Não há animais cadastrados.</p>
            ) : (
                <ul className={styles.lista}>
                    {animais.map(animal => (
                        <li key={animal.id} className={styles.info_box}>
                            <div className={styles.info}>
                                <h6>Paciente</h6>
                                <p>{animal.nome}</p>
                            </div>
                            <div className={styles.info}>
                                <h6>Espécie</h6>
                                <p>{animal.raca && animal.raca.especie && animal.raca.especie.nome}</p>
                            </div>
                            <div className={styles.button_box}>
                                <button
                                    className={styles.acessar_button}
                                    onClick={() => router.push(`/getAnimalByIdTutor/${animal.id}`)}
                                >
                                    Acessar
                                </button>
                                < ExcluirButton itemId={animal.id} onDelete={handleDeleteAnimal}/>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MeusAnimaisList;