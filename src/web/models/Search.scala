package web

import paper._

object SearchModel {


  def search(term : String, context : List[String]) : List[String] = {

    val courses = MyEduModel.getCourses
    return (for ((id,c) <- courses if isResult(context)(term, c)) yield id).toList
  }


  def isResult(context : List[String])(term : String, c : Course) : Boolean = {
    val title = c.title.text.toLowerCase
    val profs = c.profs.map(_.name).mkString.toLowerCase
    val desc = c.desc.text.toLowerCase
    val t = term.toLowerCase
    context match {
      case "title" :: cs if isMatch(title, t, 1)    => true
      case "profs" :: cs if isMatch(profs, t, 1)    => true
      case "desc" :: cs if isMatch(desc, t, 0)      => true
      case _ :: cs                                  => isResult(cs)(term, c)
      case Nil                                      => false
    }
  }


  def isMatch(haystack : String, needle : String, levenshtein : Int) : Boolean = levenshtein match {
    case 0 => haystack contains needle
    case n => {
      val matches = for (word <- haystack.split(" "); 
                         t <- needle.split(" ") 
                         if stringDistance(word, t) <= levenshtein) yield true
      matches.length > 0
    }
  }


  // From http://oldfashionedsoftware.com/2009/11/19/string-distance-and-refactoring-in-scala/
  def stringDistance(s1: String, s2: String): Int = {
    val memo = scala.collection.mutable.Map[(List[Char],List[Char]),Int]()
    def min(a:Int, b:Int, c:Int) = Math.min( Math.min( a, b ), c)
    def sd(s1: List[Char], s2: List[Char]): Int = {
      if (memo.contains((s1,s2)) == false)
        memo((s1,s2)) = (s1, s2) match {
          case (_, Nil) => s1.length
          case (Nil, _) => s2.length
          case (c1::t1, c2::t2)  => min( sd(t1,s2) + 1, sd(s1,t2) + 1,
                                         sd(t1,t2) + (if (c1==c2) 0 else 1) )
        }
      memo((s1,s2))
    }
    sd( s1.toList, s2.toList )
  }
}
