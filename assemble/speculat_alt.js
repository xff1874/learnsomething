public boolean speculate_alt(){
    boolean success =true;
    mark();//location, where to rewind.
    try match_alt;
    catch(exception e){
        success=false;
    }
    release();//back to mark;
    return success;
}