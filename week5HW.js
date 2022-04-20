
class Pokemon{
    constructor(name,level){
        this.name = name;
        this.level = level;
    }
     //Where does describe appear?
    describe(){
        return `${this.name} is level ${this.level}`
    }  
}

class Trainer{
    constructor(name){
        this.name = name;
        this.pokemons = [] //had this.trainers
    }

    addPokemon(pokemon){
        if(pokemon instanceof Pokemon){
            this.pokemons.push(pokemon);
        } else{
            throw new Error(`You can only add an instance of Pokemon. Argument is not pokemon ${pokemon}`);
        }
    }
     //Where does describe appear?
    describe() {
        return `${this.name} has ${this.pokemons.length} pokemon`
    }
}

class Menu {
    constructor(){ //Are object will always have {[trainers,]}
        this.trainers= []; 
        this.selectedTrainer = null;  //The team inside trainers array that is selected via index. 
        //'Ash Catchem' has 1 pokemon: Pikachu in index 0
    }

    start(){
        let selection = this.showMainMenuOptions()  //recieves a numb 0-4 in prompt for showmainmenuoption.
        while(selection !=0){
            switch(selection) {
                case '1' :
                    this.createTrainer(); //When do I make this method?
                    break;
                case '2' :
                    this.viewTrainer();
                    break;
                case '3' :
                    this.deleteTrainer();
                    break;
                case '4' :
                    this.displayTrainers();
                    break;
                default:
                    selection = 0

            }
            selection = this.showMainMenuOptions() //Keeps looping to bring back main menu options.

        }
        //if while condition met then this happens.
        alert('Goodbye!');
    }

    //Showmain menu options prompt records a number and sends it back to start(). 
    //What happens if I send a word or bigger number?

    showMainMenuOptions(){

        return prompt(`
        0) exit
        1) create new trainer
        2) view trainer
        3) delete trainer
        4) display all trainers
        `);
    }
        
  
    showTrainerMenuOptions(trainerInfo){
        return prompt(`
        0) back
        1) Catch Pokemon
        2) Send Pokemon to Prof Oak 
        ----------------
        ${trainerInfo}
        `)

    }

    displayTrainers(){
        let trainerString = 'All Pokemon Trainers' + '\n';

        for(let i =0; i< this.trainers.length; i++){

         trainerString += i + ')' + this.trainers[i].name + '\n';
           //trainerString += i + ')' + this.trainers[i].name + '\n'; //Every object has obj= {name,[trainer]}
        }
        alert(trainerString)
    }

    createTrainer(){
        let name = prompt('Enter name for new trainer:');
        this.trainers.push(new Trainer(name));
         //New trainer obj made and added to trainers array
    }
    viewTrainer(){
        let index = prompt('Enter the index of the trainer you wish to view:');
        if(index > -1 && index < this.trainers.length){
            this.selectedTrainer = this.trainers[index];
            let description = 'Trainer Name: ' + this.selectedTrainer.name + '\n';

            //1st loop got me the trainer, 2nd loop lets me go through his pokemon.
            for(let i = 0; i< this.selectedTrainer.pokemons.length; i++){
                description += i + ') ' + this.selectedTrainer.pokemons[i].name
                + ' - Lvl ' + this.selectedTrainer.pokemons[i].level + '\n';
                
            }    
            
            let selection = this.showTrainerMenuOptions(description)
            switch(selection){
                case '1':
                    this.catchPokemon();
                    break;
                case '2':
                    this.sendPokemonToProfOak();
                    break;
            }
        }
    }
    deleteTrainer(){
        let index = prompt('Enter the index of the Trainer you wish to delete:');
        if(index >-1 && index < this.trainers.length){
            this.trainers.splice(index,1);
        }
    }

    catchPokemon(){
        let name = prompt('Enter name for new pokemon:');
        let level= prompt(' Enter level for new pokemon: ');
        //creates/adds pokemon object to trainer that has been selected.
        this.selectedTrainer.pokemons.push(new Pokemon(name, level));

    }

    sendPokemonToProfOak(){
        let index = prompt('Enter the index of the pokemon you want to send to Prof Oak.');
        if(index >-1 && index < this.selectedTrainer.pokemons.length){
            this.selectedTrainer.pokemons.splice(index,1);
        }
    }

}


let menu = new Menu();
menu.start()
console.log(menu)


