import React, {FormEvent, useState} from 'react';
import { useHistory} from 'react-router-dom';

import PageHeader from '../../components/pageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import WarningIcon from '../../assets/images/icons/warning.svg';
import './styles.css';
import api from '../../services/api';

function TeacherForm(){

    const hisory = useHistory();

    const [name, setName]= useState('');
    const [avatar, setAvatar]= useState('');
    const [whatsapp, setWhatsapp]= useState('');
    const [bio, setBio]= useState('');

    const [subject, setSubject]= useState('');
    const [cost, setCost]= useState('');


    const [scheduleItems, setScheduleItems] = useState([
        {  week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            {  week_day: 0, from: '', to: '' } 
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index ) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        //with this line the form don't do his normal action(reload the page to redirect)
        e.preventDefault();

       api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,
        }).then(() => {
            alert('Cadastro realizado com sucesso!');

            hisory.push('/');
        }).catch(() => {
            alert('Erro no cadastro');
        })

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        })
    }

    return(
        <div id="page-teacher-form" className="container">
           <PageHeader 
           title="Que incrível que você quer dar aulas."
           description="o primeiro passo é preencher esse formulário de inscrição"
           />

        <main>
            <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>

                        <Input 
                            name="name" 
                            label="Nome Completo" 
                            value={name} 
                            onChange={(e) => {setName(e.target.value)}}/>

                        <Input 
                            name="avatar" 
                            label="Avatar"    
                            value={avatar} 
                            onChange={(e) => {setAvatar(e.target.value)}}
                        />
                        <Input 
                            name="whatsapp" 
                            label="WhatsApp"
                            value={whatsapp} 
                            onChange={(e) => {setWhatsapp(e.target.value)}}
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia" 
                            value={bio} 
                            onChange={(e) => {setBio(e.target.value)}}
                        />
                </fieldset>

                <fieldset>
                    <legend>Sobre a Aula</legend>

                        <Select 
                            name="subject" 
                            label="Matéria"
                            value={subject}
                            onChange={(e) => {setSubject(e.target.value)}}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Química', label: 'Química' },
                                { value: 'Física', label: 'Física' },
                            ]}
                            />

                        <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange= {(e) => {setCost(e.target.value)}}/>
                </fieldset>
                    
                    <fieldset>
                        <legend>
                            Horários Disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo Horário
                        </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return(
                                <div key={scheduleItem.week_day} className="schedule-item">
                                <Select 
                                name="week_day" 
                                label="Dia da Semana"
                                value={scheduleItem.week_day}
                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                options={[
                                        { value: '0', label: 'Domingo' },
                                        { value: '1', label: 'Segunda-Feira' },
                                        { value: '2', label: 'Terça-Feira' },
                                        { value: '3', label: 'Quarta-Feira' },
                                        { value: '4', label: 'Quinta-Feira' },
                                        { value: '5', label: 'Sexta-Feira' },
                                        { value: '6', label: 'Sábado' },
                                    ]}
                                />
        
                                <Input 
                                name="from"
                                label="Das" 
                                type="time"
                                value={scheduleItem.from}
                                onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                 />

                                <Input 
                                name="to"
                                label="Até" 
                                type="time"
                                value={scheduleItem.to}
                                onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                 />
                            </div>
                            );   
                        })}
                    
                    </fieldset>

                <footer>
                    <p>
                        <img src={WarningIcon} alt="Aviso Importante"/>
                        Importante! <br/>
                        Preencha todos os dados
                    </p>
                    <button type="submit">
                            Salvar Cadastro
                    </button>
                </footer>
            </form>
        </main>
    </div>
)
}

export default TeacherForm;