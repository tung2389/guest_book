VERY IMPORTANT NOTE:

   - My data array is a reference of the this.state.data. However, the function reverse() won't affect the original array. It will only be affected by mutate one or more items in the reference array.
   - The slice() is very different from "=" in object. If slice() return a reference, it will return reference of EACH ITEM in array, and the "=" return the reference to the whole array. This is an example:
   
   
      data2 = data1.slice();
      
      data2.reverse(); // data1 isn't reversed.
      
      data2 = data1;
      
      data2.reverse(); // data1 is reversed.
