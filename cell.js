class Cell{
    static cells=[]
   
    static game_over=false
    
    static left_cells_label_object=null
    static left_mines_label_object=null
    static grid_size=0
    static rows=0
    static cols=0
    static cells_left=0
    static mines_left=0
    static device="big"
    static click_event='contextmenu'
    


    constructor(x, y, is_mine=false ){
        this.x = x;
        this.y=y;
        this.is_mine=is_mine;
        this.cell_btn_object=null;
        this.checked=false;
        this.number=0
        this.cell_surroundigs=[]
        Cell.cells.push(this)
    }

    create_btn_object(location){
        this.cell_btn_object=document.createElement('button')
        this.cell_btn_object.addEventListener('click',(event) => this.l_click_act(event))
        this.cell_btn_object.addEventListener(Cell.click_event,(event) => this.r_click_act(event))
        this.cell_btn_object.setAttribute("class","game_button")
        //this.cell_btn_object.innerHTML=`(${this.x},${this.y})`
        location.appendChild(this.cell_btn_object)
    
    }

    


    l_click_act(event){
        
            if(this.is_mine && Cell.game_over!=true){
                this.stop_game()
        
            }
            else if(Cell.game_over!=true){

                this.check_cell()
                this.check()
                this.filling()
            }
       
    }

    r_click_act(event){
        event.preventDefault();
        if(this.checked!=true){
           
            if(!Cell.game_over){
                if(!this.is_mine){
                    this.stop_game()
                }
                this.disable_mine()
                let surroundings=this.get_surroundings()
                let cell_surroundigs=this.get_surroundings_as_cells(surroundings)
                this.number=this.check_surroundings(cell_surroundigs)
                this.cell_btn_object.innerHTML=`${this.number}`//(text=f'{self.number}',foreground="red")
                this.cell_btn_object.style.color="red"
                this.check_cell()
                this.check()
            }
        }
    }


    filling(cell=null){
        if(cell==null){
            cell=this}
        let indexes=cell.get_cell_by_indexes(Cell.cells,cell.x,cell.y)
       
        let surroundings=cell.get_surroundings()

        let cell_surroundigs=cell.get_surroundings_as_cells(surroundings)

        this.cell_surroundigs=cell_surroundigs
        console.log("sur_cells")
        console.log(this.cell_surroundigs)
        cell.number=cell.check_surroundings(this.cell_surroundigs)
    
        cell.cell_btn_object.innerHTML=`${cell.number}`
         cell.cell_btn_object.style.backgroundColor=`green`
        console.log('cell number: '+cell.number)
      }
    stop_game(){
      if(!Cell.game_over){
          if(this.is_mine == true){
                this.cell_btn_object.style.backgroundColor ='red'
                
            }
          else{
            this.cell_btn_object.style.backgroundColor ='black'
              
            }
        }
          
      Cell.game_over=true
      for (let cell of Cell.cells){
          if(cell.is_mine){
          
            cell.cell_btn_object.style.backgroundColor ='red'
            cell.cell_btn_object.innerHTML='&#x1f4a3'}
      }
      let div=document.getElementsByClassName("status")[0]
      div.setAttribute("id","red")
      div.innerHTML="you have sadly lost"
      div.style.color="red"
      div.appendChild(Cell.new_game_button())
      
    }
      
    get_cell_by_indexes(cells,x,y){
        for (let cell of cells) {
            if(cell.x==x && cell.y==y){
                return [cell.x,cell.y]
            }}}
    
    get_surroundings(){
        let get_cell_by_indexes=this.get_cell_by_indexes
        let surroundings=null
        let x=this.x
        let y=this.y
        if(x==0 && y==0){
                
                surroundings=[
                    get_cell_by_indexes(Cell.cells,x,y+1),
                    get_cell_by_indexes(Cell.cells,x+1,y+1),
                    get_cell_by_indexes(Cell.cells,x+1,y)
                    ]}
        else if(x==0 && y!=0 && y!=Cell.cols-1){
                
                surroundings=[
                    get_cell_by_indexes(Cell.cells,x,y+1),
                    get_cell_by_indexes(Cell.cells,x,y-1),
                    get_cell_by_indexes(Cell.cells,x+1,y+1),
                    get_cell_by_indexes(Cell.cells,x+1,y-1),
                    get_cell_by_indexes(Cell.cells,x+1,y),
                    ]}
                
    
        else if((x!=0 && x!=Cell.rows-1) && (y!=0 && y!=Cell.cols-1)){
                
              
                surroundings=[
                    get_cell_by_indexes(Cell.cells,x,y+1),
                    get_cell_by_indexes(Cell.cells,x,y-1),
                    get_cell_by_indexes(Cell.cells,x+1,y+1),
                    get_cell_by_indexes(Cell.cells,x+1,y-1),
                    get_cell_by_indexes(Cell.cells,x+1,y),
                    get_cell_by_indexes(Cell.cells,x-1,y),
                    get_cell_by_indexes(Cell.cells,x-1,y+1),
                    get_cell_by_indexes(Cell.cells,x-1,y-1)
            
                    ]}
        
        else if(x==0 && y==Cell.cols-1){
                
                surroundings=[
                    get_cell_by_indexes(Cell.cells,x,y-1),
                    get_cell_by_indexes(Cell.cells,x+1,y-1),
                    get_cell_by_indexes(Cell.cells,x+1,y),
                 ]}
        else if(x==Cell.rows-1 && y==0){
              
                surroundings=[
                    get_cell_by_indexes(Cell.cells,x,y+1),
                    get_cell_by_indexes(Cell.cells,x-1,y+1),
                    get_cell_by_indexes(Cell.cells,x-1,y),
                 ]}
        else if(x==Cell.rows-1 && y==Cell.cols-1){
              
                surroundings=[
                    get_cell_by_indexes(Cell.cells,x,y-1),
                    get_cell_by_indexes(Cell.cells,x-1,y-1),
                    get_cell_by_indexes(Cell.cells,x-1,y),
                 ]}
        else if(x==Cell.rows-1 && y!=0 && y!=Cell.cols-1){
            
                surroundings=[
                    get_cell_by_indexes(Cell.cells,x,y+1),
                    get_cell_by_indexes(Cell.cells,x,y-1),
                    get_cell_by_indexes(Cell.cells,x-1,y),
                    get_cell_by_indexes(Cell.cells,x-1,y+1),
                    get_cell_by_indexes(Cell.cells,x-1,y-1),
                 ]}
        else if(x!=0 && y==0){
              
                surroundings=[
                    get_cell_by_indexes(Cell.cells,x-1,y),
                    get_cell_by_indexes(Cell.cells,x-1,y+1),
                    get_cell_by_indexes(Cell.cells,x,y+1),
                    get_cell_by_indexes(Cell.cells,x+1,y),
                    get_cell_by_indexes(Cell.cells,x+1,y+1),
                ]}
        else if(x!=0 && y==Cell.cols-1){
         
                surroundings=[
                    get_cell_by_indexes(Cell.cells,x-1,y),
                    get_cell_by_indexes(Cell.cells,x-1,y-1),
                    get_cell_by_indexes(Cell.cells,x,y-1),
                    get_cell_by_indexes(Cell.cells,x+1,y),
                    get_cell_by_indexes(Cell.cells,x+1,y-1),
                ]}
            return surroundings}
        
        
    get_surroundings_as_cells(surroundings){

            let sur_list=[]
         
            for (let gen_cell of Cell.cells){
               
                for (let sur_cell of surroundings){
                    if(gen_cell.x==sur_cell[0] && gen_cell.y==sur_cell[1]){
                   
                        sur_list.push(gen_cell)}
                    }}
            return sur_list}


    check_surroundings(surroundings){

        let counter=0
            for (let cell of surroundings){
                if (cell.is_mine){
                    counter++}
                }
            return counter}
    check_cell(){
        this.checked=true
    }
    
     check(){
        let ctr=0
        let ctr_mines=0
        if(!Cell.game_over){
          
            for (let cell of Cell.cells){
                if (cell.checked==true){
                ctr++
                }
                if(cell.checked && cell.is_mine){
                    ctr_mines++
                }
            }
        }  
            Cell.cells_left=Math.pow(Cell.grid_size,2)-ctr
            Cell.left_cells_label_object.innerHTML=`cells left: ${Cell.cells_left}`

            Cell.mines_left=Cell.mines_count-ctr_mines
            Cell.left_mines_label_object.innerHTML=`mines left: ${Cell.mines_left}`
            console.log("counter= "+ctr)
            if(ctr==Math.pow(Cell.grid_size,2)){
                        document.getElementsByClassName("status")[0].setAttribute("id","green")
                        document.getElementsByClassName("status")[0].innerHTML="you have won!"
                        document.getElementsByClassName("status")[0].style.color="green"
            }
        }

    static create_cell_count_label(location1,location2){
            let label1=document.createElement('h1')
            let label2=document.createElement('h1')//Label(location,text=f"cells left: {Cell.left_cells_number}",bg="black",fg="white",width=12,height=4,font=("",28) )
            label1.innerHTML=`cells left: ${Cell.cells_left}`
            label2.innerHTML=`mines left: ${Cell.mines_left}`
            location1.appendChild(label1)
            location2.appendChild(label2)
            Cell.left_cells_label_object= label1
            Cell.left_mines_label_object= label2
        }


        
    static randomize_mines(){
    console.log("we are in the static function:")
    let picked_mines=[]
    let mines_count=Math.pow(Cell.grid_size,2)/4
    //for(let i=0;i<Math.floor(mines_count);i++){
    let i=0
    while(i<Math.floor(mines_count)){
        let mined_cell_index=Math.floor(Math.random()*Cell.cells.length)
        let item=Cell.cells[mined_cell_index]
        if (!picked_mines.includes(item)) {
            picked_mines.push(item)
            i++
        }
    }
        
    
    console.log("picked_mines not modified: ")
    console.log(picked_mines)
    for (let mine of picked_mines){
        console.log(typeof(mine))
        mine.is_mine=true
}
    console.log("picked_mines modified: ")
    console.log(picked_mines)
    Cell.mines_count=mines_count
    Cell.mines_left=Cell.mines_count
    Cell.left_mines_label_object.innerHTML=`mines left: ${Cell.mines_left}`
    }

    disable_mine(){
        if(this.is_mine){
            this.cell_btn_object.style.background="yellow"
            this.cell_btn_object.disabled=true
        }}
    static new_game_button(){
        let button=document.createElement('button')
        button.innerHTML="Restart"
        button.setAttribute("id","new_game_btn")
        button.addEventListener('click',()=>{
            //setTimeout(()=>location.reload(),2000)
            location.reload()
        })

        return button

    }

    static grid_size_assignment(value){
        Cell.grid_size=value
        Cell.rows=value
        Cell.cols=value
        Cell.cells_left=Math.pow(value,2)
        
    }

    static cells_checker(){
        for(let cell of Cell.cells){
            if (cell.is_mine){
                cell.cell_btn_object.innerHTML="x"

            }
        }
    }

    /*static change_set(){
        Cell.device="small"
        Cell.click_event="dblclick"
    }*/



}
