import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import styles from "./index.module.css";
import { LoginGreenButton } from '../GreenButton';
import { LoginWhiteButton } from '../WhiteButton';
import { getCurrentUsuario } from '../../../services/userService';
import { logout } from '../../../common/logout'

//Header com botão de login e cadastro
export function Header01() {
    const router = useRouter();

    return (
        <header className={styles.header}>

            <div className={styles.boxlogo}>
                <div>
                    <Image src="/hvu_black_logo.svg" alt="Logo HVU" width={116.94} height={72.54} />
                </div>
                <div>
                    <Image src="/ufape_black_logo.svg" alt="Logo UFAPE" width={73.82} height={73.82} />
                </div>
            </div>

            <div className={styles.box_buttons} >
                <button type="button" className="btn btn-outline-success" id={styles.white_button}>Cadastre-se</button>
                < LoginGreenButton />
            </div>

        </header>
    );
}

//Header com botão de Home e Sistema
export function Header02() {
    const router = useRouter();

    return (
        <header className={styles.header}>

            <div className={styles.boxlogo}>
                <div>
                    <Image src="/hvu_black_logo.svg" alt="Logo HVU" width={116.94} height={72.54} />
                </div>
                <div>
                    <Image src="/ufape_black_logo.svg" alt="Logo UFAPE" width={73.82} height={73.82} />
                </div>
            </div>

            <div className={styles.box_buttons} >
                <button type="button" className="btn btn-link" id={styles.black_button_decoration} onClick={(e) => router.push("/")}>Home</button>
                <button type="button" className="btn btn-link" id={styles.black_button_decoration} onClick={(e) => router.push("/system")}>Sistema</button>
            </div>
        </header>
    );
}

//Header com ícone de perfil
export function Header03() {
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [tutores, setTutores] = useState(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const TutoresData = await getCurrentUsuario();
                setTutores(TutoresData.usuario);
                console.log('Usuários:', TutoresData)
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <header className={styles.header}>

            <div className={styles.boxlogo}>
                <div>
                    <Image src="/hvu_black_logo.svg" alt="Logo HVU" width={116.94} height={72.54} />
                </div>
                <div>
                    <Image src="/ufape_black_logo.svg" alt="Logo UFAPE" width={73.82} height={73.82} />
                </div>
            </div>

            <div className={styles.box_buttons} ref={dropdownRef}>
                <button type="button" className="btn btn-link" onClick={toggleDropdown}>
                    <Image src="/icone_perfil.svg" alt="Ícone de perfil" width={59.2} height={59.2} />
                </button>
                {dropdownOpen && (
                    <div className={styles.dropdown_container}>
                        <div className={styles.dropdown}>
                            <button className={styles.button1} onClick={(e) => router.push(`/meuPerfil/${tutores.id}`)}>
                                <div><Image src="/info_icon.svg" alt="Ícone de perfil" width={18.87} height={18.87} /></div>
                                <div>Meu perfil</div>
                            </button>
                            <button className={styles.button2} onClick={(e) => logout()}>
                                <div><Image src="/left_icon.svg" alt="Ícone de perfil" width={17.88} height={17.88} /></div>
                                <div>Sair</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

//Header botão de login
export function Header04() {
    const router = useRouter();
    return (
        <header className={styles.header}>

            <div className={styles.boxlogo}>
                <div>
                    <Image src="/hvu_black_logo.svg" alt="Logo HVU" width={116.94} height={72.54} />
                </div>
                <div>
                    <Image src="/ufape_black_logo.svg" alt="Logo UFAPE" width={73.82} height={73.82} />
                </div>
            </div>

            <div className={styles.box_buttons} >
                < LoginWhiteButton />
            </div>

        </header>
    );
}

