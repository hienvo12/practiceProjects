using System.Collections;
using System.Windows.Forms;


namespace Snake
{
	class Input
	{
		//load list for keyboard input
		private static Hashtable keyTable = new Hashtable();

		//
		public static bool KeyPressed(Keys key)
		{
			if(keyTable[key] == null)
			{
				return false;
			}
			return (bool)keyTable[key];
		}
		//detect if a keybaord button is pressed
		public static void ChangeState(Keys key, bool state)
		{
			keyTable[key] = state;
		}
	}
}
